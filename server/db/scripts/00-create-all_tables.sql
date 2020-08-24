-- Tables

-- Table: routing_value
-- DROP TABLE routing_value;
CREATE TABLE IF NOT EXISTS routing_value (
	platform text,
	host text UNIQUE NOT NULL,
	CONSTRAINT routing_value_pkey PRIMARY KEY (platform)
);

-- Table: champion
-- DROP TABLE champion;
CREATE TABLE IF NOT EXISTS champion (
	champion_id integer NOT NULL,
	champion_data json NOT NULL,
	CONSTRAINT champion_pkey PRIMARY KEY (champion_id)
);

-- Table: champion_tag
-- DROP TABLE champion_tag;
CREATE TABLE IF NOT EXISTS champion_tag (
	champion_id integer NOT NULL,
	tag text NOT NULL,
	CONSTRAINT champion_tag_pkey PRIMARY KEY (champion_id, tag)
);

-- Table: summoner
-- DROP TABLE summoner;
CREATE TABLE IF NOT EXISTS summoner (
	puuid text NOT NULL,
	account_id text NOT NULL,
	summoner_id text NOT NULL,
	summoner_name text NOT NULL,
	platform text NOT NULL,
	league_tier text NOT NULL,
	league_division text NOT NULL,
	created_at timestamp DEFAULT NOW(),
	CONSTRAINT puuid_pkey PRIMARY KEY (puuid)
);

-- Table: champion_points
-- DROP TABLE champion_points;
CREATE TABLE IF NOT EXISTS champion_points (
	summoner_puuid text NOT NULL,
	champion_points_data json NOT NULL
);



-- Foreign Keys

-- Reference: champion & champion_tag
ALTER TABLE champion_tag 
	ADD CONSTRAINT champion_champion_id_fkey FOREIGN KEY (champion_id)
		REFERENCES champion (champion_id) MATCH SIMPLE
		ON DELETE CASCADE;

-- Reference: summoner & routing_value
ALTER TABLE summoner
	ADD CONSTRAINT routing_value_platform_fkey FOREIGN KEY (platform)
		REFERENCES routing_value (platform) MATCH SIMPLE;

-- Reference: champion_points & summoner
ALTER TABLE champion_points
	ADD CONSTRAINT summoner_puuid_fkey FOREIGN KEY (summoner_puuid)
		REFERENCES summoner (puuid) MATCH SIMPLE
		ON DELETE CASCADE;
