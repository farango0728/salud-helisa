export interface TypeMedicalAppointment{
	id: number,
	date: string,
	idPatient: number,
	patient: string,
	idDoctor: number,
	doctor: string,
	idSpecialty: number,
	especialty: string,
	idNurse: number,
	nurse: string,
	state: boolean
}

export interface Message {
	message: string;
}