package admin

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"dormitory.com/dormitory/services"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type (
	AdminAuthen struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}
)

func SignInAdmin(c *gin.Context) {
	var payload AdminAuthen
	var admin entity.Admins
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา admin ด้วย Username ที่ผู้ใช้กรอกเข้ามา
	if err := config.DB().Raw("SELECT * FROM admins WHERE username = ?", payload.Username).Scan(&admin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ตรวจสอบหากไม่พบข้อมูล
	if admin.Username == "" {
		c.JSON(http.StatusNotFound, gin.H{"error": "ไม่พบข้อมูลแอดมิน"})
		return
	}
	// ตรวจสอบรหัสผ่าน
	err := bcrypt.CompareHashAndPassword([]byte(admin.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password is incerrect"})
		return
	}
	jwtWrapper := services.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}
	signedToken, err := jwtWrapper.GenerateToken(admin.Username)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"token_type": "Bearer", "token": signedToken, "id": admin.ID})
}
