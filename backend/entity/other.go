package entity

import (
	"time"

	"gorm.io/gorm"
)

type Other struct {
	gorm.Model
	LatestGraduationFrom string
	GraduatedYear        uint
	Gpax                 float64
	PersonalVehicles     *string
	Color                *string
	PlateNo              *string
	TaxDate              *time.Time
	ProvinceVehicle      *string
	Type                 *string
	ExpiredCard          *time.Time

	LicenseID *uint           
	License   *FamilyStatuses `gorm:"foreignKey: LicenseID" json:"license"`

	// One-to-one relationship with Student
	//StudentID string
	//StudentID string
	StudentID uint      `json:"student_id"`
	Student   *Students `gorm:"foreignKey: student_id;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"student"`
}
