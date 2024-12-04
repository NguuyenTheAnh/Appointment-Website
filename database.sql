CREATE TABLE "users" (
  "id" int PRIMARY KEY,
  "username" varchar(50),
  "email" varchar(100),
  "password" varchar(100),
  "phone" varchar(20),
  "address" text,
  "department" text,
  "role_id" int
);

CREATE TABLE "roles" (
  "id" int PRIMARY KEY,
  "role_name" varchar(30)
);

CREATE TABLE "schedules" (
  "id" int PRIMARY KEY,
  "teacher_id" int,
  "date" date,
  "start_time" time,
  "end_time" time
);

CREATE TABLE "appointments" (
  "id" int PRIMARY KEY,
  "student_id" int,
  "schedule_id" int,
  "status" varchar(20),
  "note" text
);

ALTER TABLE "users" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE "schedules" ADD FOREIGN KEY ("teacher_id") REFERENCES "users" ("id");

ALTER TABLE "appointments" ADD FOREIGN KEY ("schedule_id") REFERENCES "schedules" ("id");

ALTER TABLE "appointments" ADD FOREIGN KEY ("student_id") REFERENCES "users" ("id");
