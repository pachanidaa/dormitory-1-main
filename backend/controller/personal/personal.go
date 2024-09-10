package personal

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

/*
// POST /create-personal
func CreatePersonal(c *gin.Context) {
	var personal entity.Personal

	// ดึงข้อมูล StudentID จากการเข้าสู่ระบบ (ตัวอย่าง: จาก JWT token หรือ session)
	studentID := c.MustGet("student_id").(string) // สมมุติว่ามีการเก็บ StudentID ไว้ใน context

	// bind เข้าตัวแปร personal
	if err := c.ShouldBindJSON(&personal); err != nil {
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
	personal.StudentID = student.StudentID

	if err := db.Create(&personal).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Personal created successfully", "data": personal})
}
*/
// GET /get-personal/:id
func GetPersonal(c *gin.Context) {
	ID := c.Param("id")
	var personal entity.Personal

	db := config.DB()
	results := db.First(&personal, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if personal.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, personal)
}

// GET /list-personal
func ListPersonal(c *gin.Context) {

	var personal []entity.Personal

	db := config.DB()
	results := db.Find(&personal)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, personal)
}

// PATCH /update-personal
func UpdatePersonal(c *gin.Context) {
	var personal entity.Personal
	PersonalID := c.Param("id")
	// Get the database connection
	db := config.DB()

	// Check if the personal information exists
	result := db.First(&personal, "id = ?", PersonalID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Personal ID not found"})
		return
	}

	// Bind the incoming JSON payload to the personal object
	if err := c.ShouldBindJSON(&personal); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&personal)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}
