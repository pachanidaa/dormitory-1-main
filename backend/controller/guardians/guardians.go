package guardians

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

func GetAll(c *gin.Context) {
	db := config.DB()
	var guardians []entity.Guardians
	db.Find(&guardians)
	c.JSON(http.StatusOK, &guardians)
}
