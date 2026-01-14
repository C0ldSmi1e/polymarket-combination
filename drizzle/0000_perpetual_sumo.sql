CREATE TABLE "combo_events" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "combo_events_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"comboId" integer NOT NULL,
	"event_slug" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "combos" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "combos_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" varchar(500) NOT NULL,
	"isActive" boolean NOT NULL
);
--> statement-breakpoint
ALTER TABLE "combo_events" ADD CONSTRAINT "combo_events_comboId_combos_id_fk" FOREIGN KEY ("comboId") REFERENCES "public"."combos"("id") ON DELETE cascade ON UPDATE no action;