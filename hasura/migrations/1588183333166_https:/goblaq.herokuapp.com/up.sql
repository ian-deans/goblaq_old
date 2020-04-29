CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE FUNCTION public.update_average_rating() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
        UPDATE businesses SET average_rating=CAST((SELECT AVG("rating") FROM reviews WHERE business_id=NEW.business_id) AS numeric(3,1) ) WHERE id=NEW.business_id;
        RETURN NEW;
    END;
    $$;
CREATE TABLE public.early_signups (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    email_address text NOT NULL,
    business_name text,
    city text,
    state text,
    zip text,
    business_category_id integer,
    logo_url text,
    name text,
    address text
);
CREATE TABLE public.business_hours (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    business_id integer NOT NULL,
    day text NOT NULL,
    opens time with time zone,
    closes time with time zone
);
CREATE TABLE public.businesses (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL,
    description text,
    average_rating double precision DEFAULT 0.0 NOT NULL,
    location_id integer,
    owner_id integer,
    category_id integer,
    verified boolean DEFAULT false NOT NULL,
    tags character varying,
    claimed boolean DEFAULT false NOT NULL
);
CREATE TABLE public.contacts (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    business_id integer NOT NULL,
    contact_type text NOT NULL,
    contact_value text NOT NULL
);
CREATE TABLE public.locations (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    address_1 text,
    address_2 text,
    city text,
    state text NOT NULL,
    zip text
);
CREATE TABLE public.post_likes (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL
);
CREATE TABLE public.posts (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id integer,
    forum_id integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    active boolean DEFAULT true NOT NULL
);
CREATE TABLE public.responses (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    parent_id integer,
    user_id integer,
    post_id integer NOT NULL,
    content text NOT NULL
);
CREATE TABLE public.responses_likes (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id integer NOT NULL,
    response_id integer NOT NULL
);
CREATE TABLE public.reviews (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id integer NOT NULL,
    business_id integer NOT NULL,
    rating double precision NOT NULL,
    title text,
    description text
);
CREATE TABLE public.users (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    username character varying NOT NULL,
    email_address character varying NOT NULL,
    first_name character varying,
    firebase_uid text,
    last_name character varying,
    avatar_url text
);
COMMENT ON TABLE public.users IS 'Users';
CREATE TABLE public.business_categories (
    name text NOT NULL,
    text text NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    created_at timestamp with time zone DEFAULT now(),
    id integer NOT NULL
);
CREATE SEQUENCE public.business_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.business_categories_id_seq OWNED BY public.business_categories.id;
CREATE TABLE public.business_features (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    business_id integer NOT NULL,
    feature_id integer NOT NULL
);
CREATE SEQUENCE public.business_features_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.business_features_id_seq OWNED BY public.business_features.id;
CREATE SEQUENCE public.business_hours_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.business_hours_id_seq OWNED BY public.business_hours.id;
CREATE SEQUENCE public.businesses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.businesses_id_seq OWNED BY public.businesses.id;
CREATE TABLE public.contact_types (
    type text NOT NULL,
    description text NOT NULL
);
CREATE SEQUENCE public.contacts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.contacts_id_seq OWNED BY public.contacts.id;
CREATE TABLE public.coordinates (
    longitude numeric NOT NULL,
    lattitude numeric NOT NULL,
    location_id integer NOT NULL,
    id integer NOT NULL
);
CREATE SEQUENCE public.coordinates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.coordinates_id_seq OWNED BY public.coordinates.id;
CREATE TABLE public.days (
    name text NOT NULL
);
CREATE SEQUENCE public.early_signups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.early_signups_id_seq OWNED BY public.early_signups.id;
CREATE TABLE public.features (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    image_url text,
    key text NOT NULL
);
CREATE SEQUENCE public.features_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.features_id_seq OWNED BY public.features.id;
CREATE TABLE public.forum_types (
    id integer NOT NULL,
    type text NOT NULL,
    name text
);
CREATE SEQUENCE public.forum_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.forum_types_id_seq OWNED BY public.forum_types.id;
CREATE TABLE public.forums (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    forum_type_id integer
);
CREATE SEQUENCE public.forums_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.forums_id_seq OWNED BY public.forums.id;
CREATE SEQUENCE public.locations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.locations_id_seq OWNED BY public.locations.id;
CREATE SEQUENCE public.post_likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.post_likes_id_seq OWNED BY public.post_likes.id;
CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;
CREATE SEQUENCE public.responses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.responses_id_seq OWNED BY public.responses.id;
CREATE SEQUENCE public.responses_likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.responses_likes_id_seq OWNED BY public.responses_likes.id;
CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;
CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
ALTER TABLE ONLY public.business_categories ALTER COLUMN id SET DEFAULT nextval('public.business_categories_id_seq'::regclass);
ALTER TABLE ONLY public.business_features ALTER COLUMN id SET DEFAULT nextval('public.business_features_id_seq'::regclass);
ALTER TABLE ONLY public.business_hours ALTER COLUMN id SET DEFAULT nextval('public.business_hours_id_seq'::regclass);
ALTER TABLE ONLY public.businesses ALTER COLUMN id SET DEFAULT nextval('public.businesses_id_seq'::regclass);
ALTER TABLE ONLY public.contacts ALTER COLUMN id SET DEFAULT nextval('public.contacts_id_seq'::regclass);
ALTER TABLE ONLY public.coordinates ALTER COLUMN id SET DEFAULT nextval('public.coordinates_id_seq'::regclass);
ALTER TABLE ONLY public.early_signups ALTER COLUMN id SET DEFAULT nextval('public.early_signups_id_seq'::regclass);
ALTER TABLE ONLY public.features ALTER COLUMN id SET DEFAULT nextval('public.features_id_seq'::regclass);
ALTER TABLE ONLY public.forum_types ALTER COLUMN id SET DEFAULT nextval('public.forum_types_id_seq'::regclass);
ALTER TABLE ONLY public.forums ALTER COLUMN id SET DEFAULT nextval('public.forums_id_seq'::regclass);
ALTER TABLE ONLY public.locations ALTER COLUMN id SET DEFAULT nextval('public.locations_id_seq'::regclass);
ALTER TABLE ONLY public.post_likes ALTER COLUMN id SET DEFAULT nextval('public.post_likes_id_seq'::regclass);
ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);
ALTER TABLE ONLY public.responses ALTER COLUMN id SET DEFAULT nextval('public.responses_id_seq'::regclass);
ALTER TABLE ONLY public.responses_likes ALTER COLUMN id SET DEFAULT nextval('public.responses_likes_id_seq'::regclass);
ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);
ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
ALTER TABLE ONLY public.business_categories
    ADD CONSTRAINT business_categories_id_key UNIQUE (id);
ALTER TABLE ONLY public.business_categories
    ADD CONSTRAINT business_categories_name_key UNIQUE (name);
ALTER TABLE ONLY public.business_categories
    ADD CONSTRAINT business_categories_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.business_features
    ADD CONSTRAINT business_features_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.business_hours
    ADD CONSTRAINT business_hours_business_id_day_key UNIQUE (business_id, day);
ALTER TABLE ONLY public.business_hours
    ADD CONSTRAINT business_hours_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.businesses
    ADD CONSTRAINT businesses_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.contact_types
    ADD CONSTRAINT contact_types_pkey PRIMARY KEY (type);
ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.coordinates
    ADD CONSTRAINT coordinates_location_id_key UNIQUE (location_id);
ALTER TABLE ONLY public.coordinates
    ADD CONSTRAINT coordinates_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.days
    ADD CONSTRAINT days_pkey PRIMARY KEY (name);
ALTER TABLE ONLY public.early_signups
    ADD CONSTRAINT early_signups_email_address_key UNIQUE (email_address);
ALTER TABLE ONLY public.early_signups
    ADD CONSTRAINT early_signups_logo_url_key UNIQUE (logo_url);
ALTER TABLE ONLY public.early_signups
    ADD CONSTRAINT early_signups_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.features
    ADD CONSTRAINT features_key_key UNIQUE (key);
ALTER TABLE ONLY public.features
    ADD CONSTRAINT features_name_key UNIQUE (name);
ALTER TABLE ONLY public.features
    ADD CONSTRAINT features_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.forum_types
    ADD CONSTRAINT forum_types_name_key UNIQUE (name);
ALTER TABLE ONLY public.forum_types
    ADD CONSTRAINT forum_types_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.forums
    ADD CONSTRAINT forums_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_address_1_address_2_city_state_zip_key UNIQUE (address_1, address_2, city, state, zip);
ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_id_key UNIQUE (id);
ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.post_likes
    ADD CONSTRAINT post_likes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.post_likes
    ADD CONSTRAINT post_likes_user_id_post_id_key UNIQUE (user_id, post_id);
ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.responses_likes
    ADD CONSTRAINT responses_likes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.responses
    ADD CONSTRAINT responses_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_business_id_user_id_key UNIQUE (business_id, user_id);
ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_avatar_url_key UNIQUE (avatar_url);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_address_key UNIQUE (email_address);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_firebase_uid_key UNIQUE (firebase_uid);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
CREATE TRIGGER set_public_business_categories_updated_at BEFORE UPDATE ON public.business_categories FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_business_categories_updated_at ON public.business_categories IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_business_hours_updated_at BEFORE UPDATE ON public.business_hours FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_business_hours_updated_at ON public.business_hours IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_businesses_updated_at BEFORE UPDATE ON public.businesses FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_businesses_updated_at ON public.businesses IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_contacts_updated_at BEFORE UPDATE ON public.contacts FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_contacts_updated_at ON public.contacts IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_early_signups_updated_at BEFORE UPDATE ON public.early_signups FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_early_signups_updated_at ON public.early_signups IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_features_updated_at BEFORE UPDATE ON public.features FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_features_updated_at ON public.features IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_forums_updated_at BEFORE UPDATE ON public.forums FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_forums_updated_at ON public.forums IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_locations_updated_at BEFORE UPDATE ON public.locations FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_locations_updated_at ON public.locations IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_post_likes_updated_at BEFORE UPDATE ON public.post_likes FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_post_likes_updated_at ON public.post_likes IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_posts_updated_at ON public.posts IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_responses_likes_updated_at BEFORE UPDATE ON public.responses_likes FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_responses_likes_updated_at ON public.responses_likes IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_responses_updated_at BEFORE UPDATE ON public.responses FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_responses_updated_at ON public.responses IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_reviews_updated_at ON public.reviews IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_users_updated_at ON public.users IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER update_rating_trigger AFTER INSERT OR UPDATE ON public.reviews FOR EACH ROW EXECUTE PROCEDURE public.update_average_rating();
ALTER TABLE ONLY public.business_features
    ADD CONSTRAINT business_features_business_id_fkey FOREIGN KEY (business_id) REFERENCES public.businesses(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.business_features
    ADD CONSTRAINT business_features_feature_id_fkey FOREIGN KEY (feature_id) REFERENCES public.features(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.business_hours
    ADD CONSTRAINT business_hours_business_id_fkey FOREIGN KEY (business_id) REFERENCES public.businesses(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.business_hours
    ADD CONSTRAINT business_hours_day_fkey FOREIGN KEY (day) REFERENCES public.days(name) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.businesses
    ADD CONSTRAINT businesses_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.business_categories(id) ON UPDATE RESTRICT;
ALTER TABLE ONLY public.businesses
    ADD CONSTRAINT businesses_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.locations(id) ON UPDATE RESTRICT ON DELETE SET NULL;
ALTER TABLE ONLY public.businesses
    ADD CONSTRAINT businesses_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_business_id_fkey FOREIGN KEY (business_id) REFERENCES public.businesses(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_contact_type_fkey FOREIGN KEY (contact_type) REFERENCES public.contact_types(type) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.coordinates
    ADD CONSTRAINT coordinates_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.locations(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.early_signups
    ADD CONSTRAINT early_signups_business_category_fkey FOREIGN KEY (business_category_id) REFERENCES public.business_categories(id) ON UPDATE RESTRICT ON DELETE SET NULL;
ALTER TABLE ONLY public.forums
    ADD CONSTRAINT forums_forum_type_fkey FOREIGN KEY (forum_type_id) REFERENCES public.forum_types(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.post_likes
    ADD CONSTRAINT post_likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.post_likes
    ADD CONSTRAINT post_likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_forum_id_fkey FOREIGN KEY (forum_id) REFERENCES public.forums(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE SET NULL;
ALTER TABLE ONLY public.responses_likes
    ADD CONSTRAINT responses_likes_response_id_fkey FOREIGN KEY (response_id) REFERENCES public.responses(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.responses_likes
    ADD CONSTRAINT responses_likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.responses
    ADD CONSTRAINT responses_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.responses(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.responses
    ADD CONSTRAINT responses_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.responses
    ADD CONSTRAINT responses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE SET NULL;
ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_business_id_fkey FOREIGN KEY (business_id) REFERENCES public.businesses(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
