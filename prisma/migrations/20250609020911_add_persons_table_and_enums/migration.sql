-- CreateEnum
CREATE TYPE "person_types" AS ENUM ('INDIVIDUAL', 'LEGAL_ENTITY', 'INTERNATIONAL');

-- CreateEnum
CREATE TYPE "person_tax_regimes" AS ENUM ('SIMPLIFIED_NATIONAL', 'NORMAL_REGIME');

-- CreateEnum
CREATE TYPE "person_origin" AS ENUM ('DOMESTIC', 'FOREIGN');

-- CreateEnum
CREATE TYPE "person_ind_ie" AS ENUM ('ICMS_TAXPAYER', 'EXEMPT_TAXPAYER', 'NON_TAXPAYER');

-- CreateEnum
CREATE TYPE "default_statuses" AS ENUM ('INACTIVE', 'ACTIVE');

-- CreateTable
CREATE TABLE "persons" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "person_name" VARCHAR(128) NOT NULL,
    "person_surname" VARCHAR(128) NOT NULL,
    "dt_birth" TIMESTAMPTZ,
    "cpf_cnpj_vat" VARCHAR(32) NOT NULL,
    "rg" VARCHAR(32),
    "ie" VARCHAR(32),
    "im" VARCHAR(32),
    "customer" BOOLEAN NOT NULL DEFAULT false,
    "supplier" BOOLEAN NOT NULL DEFAULT false,
    "transport_company" BOOLEAN NOT NULL DEFAULT false,
    "employee" BOOLEAN NOT NULL DEFAULT false,
    "curstomer_email_nfe" VARCHAR(192),
    "customer_email_nfse" VARCHAR(192),
    "customer_obs_commercial" TEXT,
    "customer_obs_technical" TEXT,
    "customer_ranking" DOUBLE PRECISION DEFAULT 0,
    "customer_status" "default_statuses" NOT NULL DEFAULT 'INACTIVE',
    "employee_status" "default_statuses" NOT NULL DEFAULT 'INACTIVE',
    "ind_ie" "person_ind_ie",
    "origin" "person_origin" NOT NULL DEFAULT 'DOMESTIC',
    "suframa" VARCHAR,
    "supplier_email_nfe" VARCHAR(192),
    "supplier_email_nfse" VARCHAR(192),
    "supplier_obs_commercial" TEXT,
    "supplier_obs_technical" TEXT,
    "supplier_ranking" DOUBLE PRECISION DEFAULT 0,
    "supplier_status" "default_statuses" NOT NULL DEFAULT 'INACTIVE',
    "tax_regime" "person_tax_regimes",
    "transport_email_nfe" VARCHAR(192),
    "transport_email_nfse" VARCHAR(192),
    "transport_obs_commercial" TEXT,
    "transport_obs_technical" TEXT,
    "transport_ranking" DOUBLE PRECISION DEFAULT 0,
    "transport_status" "default_statuses" NOT NULL DEFAULT 'INACTIVE',
    "type" "person_types" NOT NULL DEFAULT 'INDIVIDUAL',
    "employee_dt_admission" TIMESTAMPTZ,
    "employee_pis" VARCHAR(11),
    "employee_id_position" INTEGER,
    "id_person_segment" INTEGER,

    CONSTRAINT "persons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "persons_cpf_cnpj_vat_key" ON "persons"("cpf_cnpj_vat");
