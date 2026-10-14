Table users {
  id_user int [pk]
  nama_lengkap varchar
  email varchar
  total_poin int
}

Table workout_plans {
  id_plan int [pk]
  id_user int [ref: > users.id_user]
  tanggal date
}

Table exercises {
  id_exercise int [pk]
  nama_gerakan varchar
  kategori varchar
  url_video varchar
}

Table plan_exercises {
  id_plan_exercise int [pk]
  id_plan int [ref: > workout_plans.id_plan]
  id_exercise int [ref: > exercises.id_exercise]
}

Table workout_logs {
  id_log int [pk]
  id_plan int [ref: > workout_plans.id_plan]
  id_exercise int [ref: > exercises.id_exercise]
  jumlah_set int
  reps int
}

Table groups {
  id_group int [pk]
  nama_group varchar
  deskripsi text
  tanggal_dibuat date
}

Table group_members {
  id_member int [pk]
  id_group int [ref: > groups.id_group]
  id_user int [ref: > users.id_user]
  peran varchar
}