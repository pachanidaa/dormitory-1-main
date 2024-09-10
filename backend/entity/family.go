package entity

import "gorm.io/gorm"

type Family struct {
	gorm.Model
	FathersName        string
	MathersName        string
	OccupationFather   string
	OccupationMather   string
	PhoneFather        string
	PhoneMather        string
	OrGuardiansName    *string
	Relationship       *string
	OccupationGuardian *string
	PhoneGuardian      *string

	GuardiansID uint       `json:"guardian_id"`
	Guardian    *Guardians `gorm:"foreignKey: GuardiansID" json:"guardian"`

	FamilyStatusID uint            `json:"family_status_id"`
	FamilyStatus   *FamilyStatuses `gorm:"foreignKey: FamilyStatusID" json:"family_status"`

	// One-to-one relationship with Student
	//StudentID string
	StudentID uint      `json:"student_id"`
	Student   *Students `gorm:"foreignKey: student_id;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"student"`
}
