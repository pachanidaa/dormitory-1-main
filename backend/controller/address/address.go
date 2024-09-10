package address

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

// GET /list-personal
func ListAddress(c *gin.Context) {

	var address []entity.Address

	db := config.DB()
	results := db.Find(&address)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, address)
}

// GET /get-address/:id
func GetAddress(c *gin.Context) {
	ID := c.Param("id")
	var address entity.Address

	db := config.DB()
	results := db.First(&address, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if address.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, address)
}
