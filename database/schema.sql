set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "Clients" (
	"clientId" serial NOT NULL,
	"userId" integer,
  "name" varchar(255) NOT NULL,
	"owner1" varchar(255) NOT NULL,
	"owner2" varchar(255),
	"phone" varchar(255),
	"email" varchar(255),
	"dob" varchar(255),
	"breed" varchar(255),
	"gender" varchar(255),
	"ownedSince" varchar(255),
	"spayNeut" BOOLEAN,
	"vaccinated" varchar(255),
	"foodDiet" varchar(255),
	"vet" varchar(255),
	"health" varchar(255),
	"training" varchar(255),
	"profilePhoto" varchar(255),
	"isActive" BOOLEAN,
	CONSTRAINT "Clients_pk" PRIMARY KEY ("clientId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "assessments" (
	"assessmentId" serial,
	"clientId" integer NOT NULL,
	"userId" integer,
	"assessmentEntry" varchar(500),
	"assessmentDate" TIMESTAMP NOT NULL default now(),
	CONSTRAINT "assessments_pk" PRIMARY KEY ("assessmentId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "documents" (
	"fileId" serial,
	"clientId" integer NOT NULL,
	"userId" integer,
	"fileType" varchar(255),
	"fileName" varchar(255) NOT NULL,
	"uploadDate" TIMESTAMP NOT NULL default now(),
	CONSTRAINT "documents_pk" PRIMARY KEY ("fileId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "notes" (
	"note_id" integer NOT NULL,
	"clientId" integer NOT NULL,
	"userId" integer NOT NULL,
	"entry" varchar(255) NOT NULL,
	"time_stamp" TIMESTAMP NOT NULL,
	CONSTRAINT "notes_pk" PRIMARY KEY ("note_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "activityLogEntries" (
	"activity_id" serial NOT NULL,
	"clientId" integer NOT NULL,
	"userId" integer NOT NULL,
	"entry" varchar(255) NOT NULL,
	"time_stamp" TIMESTAMP(255) NOT NULL,
	CONSTRAINT "activityLogEntries_pk" PRIMARY KEY ("activity_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "calendarEvents" (
	"event_id" serial NOT NULL,
	"clientId" integer,
	"userId" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(500) NOT NULL,
	"start_date" DATE NOT NULL,
	"end_date" DATE NOT NULL,
	"start_time" TIME NOT NULL,
	"end_time" TIME NOT NULL,
	"is_recurring" BOOLEAN NOT NULL,
	CONSTRAINT "calendarEvents_pk" PRIMARY KEY ("event_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(50) NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "Clients" ADD CONSTRAINT "Clients_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "assessments" ADD CONSTRAINT "assessments_fk0" FOREIGN KEY ("clientId") REFERENCES "Clients"("clientId");
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "documents" ADD CONSTRAINT "documents_fk0" FOREIGN KEY ("clientId") REFERENCES "Clients"("clientId");
ALTER TABLE "documents" ADD CONSTRAINT "documents_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "notes" ADD CONSTRAINT "notes_fk0" FOREIGN KEY ("clientId") REFERENCES "Clients"("clientId");
ALTER TABLE "notes" ADD CONSTRAINT "notes_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "activityLogEntries" ADD CONSTRAINT "activityLogEntries_fk0" FOREIGN KEY ("clientId") REFERENCES "Clients"("clientId");
ALTER TABLE "activityLogEntries" ADD CONSTRAINT "activityLogEntries_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "calendarEvents" ADD CONSTRAINT "calendarEvents_fk0" FOREIGN KEY ("clientId") REFERENCES "Clients"("clientId");
ALTER TABLE "calendarEvents" ADD CONSTRAINT "calendarEvents_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
