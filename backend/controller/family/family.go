package family

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

// GET /list-family
func ListFamily(c *gin.Context) {

	var family []entity.Family

	db := config.DB()
	results := db.Find(&family)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, family)
}

// GET /get-family/:id
func GetFamily(c *gin.Context) {
	ID := c.Param("id")
	var family entity.Family
	//results := db.Preload("Gender").First(&student, ID)
	db := config.DB()
	results := db.Preload("FamilyStatus").Preload("Guardian").First(&family, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if family.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, family)
}
