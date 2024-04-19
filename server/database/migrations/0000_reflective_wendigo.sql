CREATE TABLE `files` (
	`id` integer PRIMARY KEY NOT NULL,
	`share_id` integer,
	`original_filename` text,
	`new_filename` text,
	`url` text NOT NULL,
	`mimetype` text,
	`size` integer,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`share_id`) REFERENCES `shares`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `shares` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text,
	`status` text DEFAULT 'active',
	`timestamp` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `files_url_unique` ON `files` (`url`);