CREATE TABLE public.forumuser
(
    user_id uuid NOT NULL,
    username character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password_hash text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT forumuser_pkey PRIMARY KEY (user_id),
    CONSTRAINT forumuser_username_key UNIQUE (username)
);

CREATE TABLE public.threads
(
    thread_id uuid NOT NULL,
    title character varying(50) COLLATE pg_catalog."default" NOT NULL,
    date timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id uuid NOT NULL,
    CONSTRAINT threads_pkey PRIMARY KEY (thread_id),
    CONSTRAINT threads_title_key UNIQUE (title),
    CONSTRAINT threads_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.forumuser (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

CREATE TABLE public.posts
(
    post_id uuid NOT NULL,
    post_text character varying(500) COLLATE pg_catalog."default" NOT NULL,
    date timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    thread_id uuid NOT NULL,
    user_id uuid NOT NULL,
    CONSTRAINT posts_pkey PRIMARY KEY (post_id),
    CONSTRAINT threads_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.forumuser (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT posts_thread_id_fkey FOREIGN KEY (thread_id)
        REFERENCES public.threads (thread_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);


ALTER TABLE public.forumuser
    OWNER to admin;

ALTER TABLE public.threads
    OWNER to admin;

ALTER TABLE public.posts
    OWNER to admin;


INSERT INTO forumuser (user_id, username, password_hash) VALUES ('aa37c3ab-ca3a-43c6-b109-c0d04dea4325','admin','$2b$12$ScQHlrtI7.2REcZdtV/IVOiaOqgX4Yzd0Pzptm/445Iyq3YUr2x52');
INSERT INTO threads (thread_id, title, date,user_id) VALUES ('368af06a-c772-4ddc-98aa-268fcfffda68','hello world!','2021-05-31 20:50:37.088635','aa37c3ab-ca3a-43c6-b109-c0d04dea4325');
INSERT INTO posts (post_id, post_text, date, thread_id, user_id) VALUES ('acf77468-7cfd-4155-b4b2-6064efddaec1','Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incLorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor inc','2021-05-31 20:50:37.088635','368af06a-c772-4ddc-98aa-268fcfffda68','aa37c3ab-ca3a-43c6-b109-c0d04dea4325');
