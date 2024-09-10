package personaldetails

import (
	"errors"
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// POST /create-personal
func CreatePersonalDetails(c *gin.Context) {
	var requestBody struct {
		Personal entity.Personal
		Address  entity.Address
		Family   entity.Family
		Other    entity.Other
	}

	// ดึงข้อมูล StudentID จากการเข้าสู่ระบบ (ตัวอย่าง: จาก JWT token หรือ session)
	studentID := c.MustGet("student_id").(string) // สมมุติว่ามีการเก็บ StudentID ไว้ใน context

	// bind เข้าตัวแปร requestBody
	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// ตรวจสอบว่า Student มีอยู่หรือไม่
	var student entity.Students
	if err := db.Where("student_id = ?", studentID).First(&student).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	// ตั้งค่า student_id ให้กับ Personal
	requestBody.Personal.StudentID = student.ID
	// สร้างข้อมูล Personal
	if err := db.Create(&requestBody.Personal).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตั้งค่า student_id ให้กับ Address
	requestBody.Address.StudentID = student.ID
	// บันทึกข้อมูล Address
	if err := db.Create(&requestBody.Address).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตั้งค่า student_id ให้กับ Family
	requestBody.Family.StudentID = student.ID
	// บันทึกข้อมูล Family
	if err := db.Create(&requestBody.Family).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตั้งค่า student_id ให้กับ OtherInformation
	requestBody.Other.StudentID = student.ID
	// บันทึกข้อมูล OtherInformation
	if err := db.Create(&requestBody.Other).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Personal details created successfully"})
}

