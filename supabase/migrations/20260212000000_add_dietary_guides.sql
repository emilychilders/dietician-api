-- =============================================
-- DIETARY GUIDES
-- =============================================

CREATE TABLE public.dietary_guides (
    id TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    avoid_ingredients TEXT[] NOT NULL DEFAULT '{}',
    safe_alternatives TEXT[] DEFAULT '{}',
    ai_prompt TEXT NOT NULL,
    sources TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_dietary_guides_category ON public.dietary_guides(category);
CREATE INDEX idx_dietary_guides_active ON public.dietary_guides(is_active) WHERE is_active = true;

ALTER TABLE public.dietary_guides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Dietary guides are readable by authenticated users"
    ON public.dietary_guides FOR SELECT TO authenticated USING (true);

CREATE POLICY "Service role can manage dietary guides"
    ON public.dietary_guides FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE TRIGGER update_dietary_guides_updated_at
    BEFORE UPDATE ON public.dietary_guides
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
