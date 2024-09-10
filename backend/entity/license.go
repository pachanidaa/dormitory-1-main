package entity

import "gorm.io/gorm"

type License struct {
	gorm.Model
	License string
}
