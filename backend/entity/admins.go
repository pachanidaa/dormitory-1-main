// entity/admin.go
package entity

import (
	"time"

	"gorm.io/gorm"
)

type Admins struct {
	gorm.Model
	Username  string `json:"username"`
	FirstName string
	LastName  string
	Phone     string
	Birthday  time.Time
	Password  string `json:"password"`
}
