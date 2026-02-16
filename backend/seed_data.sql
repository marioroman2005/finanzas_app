-- ===============================================
-- SCRIPT SOLO TRANSACCIONES (mario3@ejemplo.com)
-- ===============================================

DO $$
DECLARE
    v_account_id UUID;
    v_cat_comida UUID;
    v_cat_ocio UUID;
BEGIN
    -- 1. Buscar la CUENTA de 'mario3@ejemplo.com'
    -- (Toma la primera cuenta que encuentre para ese email)
    SELECT a.id INTO v_account_id 
    FROM accounts a
    JOIN users u ON a.user_id = u.id
    WHERE u.email = 'mario3@ejemplo.com'
    LIMIT 1;

    IF v_account_id IS NULL THEN
        RAISE NOTICE '⚠️ No se encontró ninguna cuenta para mario3@ejemplo.com. Crea una cuenta primero.';
        RETURN;
    END IF;

    -- 2. Buscar IDs de Categorías (asumiendo que existen 'Comida' y 'Ocio')
    -- Si no existen, los dejará como NULL
    SELECT id INTO v_cat_comida FROM categories WHERE name = 'Comida' LIMIT 1;
    SELECT id INTO v_cat_ocio FROM categories WHERE name = 'Ocio' LIMIT 1;

    -- 3. Insertar Transacciones

    -- Ingreso (Nómina) - Sin categoría
    INSERT INTO transactions (account_id, category_id, amount, date, description)
    VALUES (v_account_id, NULL, 2500.00, CURRENT_DATE - INTERVAL '5 days', 'Nómina Marzo');

    -- Gasto (Comida)
    IF v_cat_comida IS NOT NULL THEN
        INSERT INTO transactions (account_id, category_id, amount, date, description)
        VALUES (v_account_id, v_cat_comida, -120.50, CURRENT_DATE - INTERVAL '2 days', 'Compra Semanal');
    END IF;

    -- Gasto (Ocio)
    IF v_cat_ocio IS NOT NULL THEN
        INSERT INTO transactions (account_id, category_id, amount, date, description)
        VALUES (v_account_id, v_cat_ocio, -60.00, CURRENT_DATE - INTERVAL '1 day', 'Cine y Cena');
    END IF;
    
    -- Otro Gasto (Comida)
    IF v_cat_comida IS NOT NULL THEN
        INSERT INTO transactions (account_id, category_id, amount, date, description)
        VALUES (v_account_id, v_cat_comida, -15.00, CURRENT_DATE, 'Almuerzo Trabajo');
    END IF;

    RAISE NOTICE '✅ Transacciones insertadas para la cuenta %', v_account_id;
END $$;
