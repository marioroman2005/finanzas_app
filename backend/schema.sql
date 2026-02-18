-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Accounts Table
CREATE TABLE IF NOT EXISTS accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('banco', 'efectivo', 'tarjeta', 'inversion', 'otro')),
    currency VARCHAR(3) DEFAULT 'EUR',
    current_balance DECIMAL(15, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('INCOME', 'EXPENSE')),
    color VARCHAR(20) DEFAULT '#cccccc',
    user_id UUID REFERENCES users(id) ON DELETE SET NULL, -- NULL for global categories
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    amount DECIMAL(15, 2) NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert Default Categories (if not exists)
INSERT INTO categories (name, type, color, user_id) 
SELECT 'Comida', 'EXPENSE', '#EF4444', NULL::UUID WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Comida')
UNION ALL
SELECT 'Transporte', 'EXPENSE', '#3B82F6', NULL::UUID WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Transporte')
UNION ALL
SELECT 'Vivienda', 'EXPENSE', '#10B981', NULL::UUID WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Vivienda')
UNION ALL
SELECT 'Salud', 'EXPENSE', '#F59E0B', NULL::UUID WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Salud')
UNION ALL
SELECT 'Ocio', 'EXPENSE', '#8B5CF6', NULL::UUID WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Ocio');
