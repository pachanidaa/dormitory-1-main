package entity

import (
	"time"

	"gorm.io/gorm"
)

type Students struct {
	gorm.Model
	StudentID string    `json:"student_id"`
	Password  string    `json:"password"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Birthday  time.Time `json:"birthday"`
	Year      uint      `json:"year"`
	Major     string    `json:"major"`

	GenderID uint     `json:"gender_id"`
	Gender   *Genders `gorm:"foreignKey: gender_id" json:"gender"`
}
