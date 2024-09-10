package genders

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

func GetAll(c *gin.Context) {
	db := config.DB()
	var genders []entity.Genders
	db.Find(&genders)
	c.JSON(http.StatusOK, &genders)
}
