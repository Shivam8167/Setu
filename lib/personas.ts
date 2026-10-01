export type Persona = "product-manager";

export type PersonaConfig = {
  id: Persona;
  label: string;
  routeBase: string;
  identity: {
    name: string;
    role: string;
    initials: string;
  };
};

export const PERSONAS: Record<Persona, PersonaConfig> = {
  "product-manager": {
    id: "product-manager",
    label: "Product Manager",
    routeBase: "",
    identity: {
      name: "Dhruv Singla",
      role: "Product Manager",
      initials: "DS",
    },
  },
};

export const PERSONA_LIST: PersonaConfig[] = Object.values(PERSONAS);

const DEFAULT_PERSONA: Persona = "product-manager";

export function personaFromPathname(pathname: string | null | undefined): Persona {
  return DEFAULT_PERSONA;
}

export function personaConfigFromPathname(pathname: string | null | undefined): PersonaConfig {
  return PERSONAS[DEFAULT_PERSONA];
}
