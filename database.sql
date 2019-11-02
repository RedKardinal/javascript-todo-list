-- table --
CREATE TABLE "toDoList" (
"id" serial primary key,
"task" varchar(80) not null,
"completed" boolean DEFAULT false
);

-- insert starting data --

INSERT INTO "toDoList" ("task")
VALUES ('Complete Weekend Assignment'),
('Do Laundry'),
('Practice Instrument');

SELECT * FROM "toDoList";

DROP TABLE "toDoList";