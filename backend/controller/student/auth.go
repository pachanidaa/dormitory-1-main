package student

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"dormitory.com/dormitory/services"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type (
	StudentAuthen struct {
		StudentID string `json:"student_id"`
		Password  string `json:"password"`
	}
)

func SignInStudent(c *gin.Context) {
	var payload StudentAuthen
	var student entity.Students
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา student ด้วย StudentID ที่ผู้ใช้กรอกเข้ามา
	if err := config.DB().Raw("SELECT * FROM students WHERE student_id = ?", payload.StudentID).Scan(&student).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ตรวจสอบหากไม่พบข้อมูล
	if student.StudentID == "" {
		c.JSON(http.StatusNotFound, gin.H{"error": "ไม่พบข้อมูลนักศึกษา"})
		return
	}
	// ตรวจสอบรหัสผ่าน
	err := bcrypt.CompareHashAndPassword([]byte(student.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password is incerrect"})
		return
	}
	jwtWrapper := services.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}
	signedToken, err := jwtWrapper.GenerateToken(student.StudentID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"token_type": "Bearer", "token": signedToken, "id": student.ID})
}
