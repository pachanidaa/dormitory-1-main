package entity

import "gorm.io/gorm"

type FamilyStatuses struct {
	gorm.Model
	FamilyStatus string 
}
