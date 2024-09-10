package other

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

// GET /list-other
func ListOther(c *gin.Context) {

	var other []entity.Other

	db := config.DB()
	results := db.Find(&other)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, other)
}

// GET /get-other/:id
func GetOther(c *gin.Context) {
	ID := c.Param("id")
	var other entity.Other
	//results := db.Preload("Gender").First(&student, ID)
	db := config.DB()
	results := db.Preload("License").First(&other, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if other.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, other)
}
