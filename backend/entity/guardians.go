package entity

import "gorm.io/gorm"

type Guardians struct {
	gorm.Model
	Guardian string 
}
