/**
 * Deno includes:
 *
 * 1. The test runner in the CLI.
 * 2. Assertions in the standard library
 * 3. Built-in test fixtures with Deno.test().
 */

import { filterHabitablePlanets } from "./planets.ts";
import { assertEquals } from "https://deno.land/std@0.105.0/testing/asserts.ts";

type PlanetFilterKeys = {
  koi_disposition: string;
  koi_prad: string;
  koi_srad: string;
  koi_smass: string;
};

const HABITABLE_PLANET: PlanetFilterKeys = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "1",
};

const NOT_CONFIRMED: PlanetFilterKeys = {
  koi_disposition: "FALSE POSITIVE",
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "1",
};

const TOO_LARGE_PLANETARY_RADIUS: PlanetFilterKeys = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1.5",
  koi_srad: "1",
  koi_smass: "1",
};

const TOO_LARGE_SOLAR_RADIUS: PlanetFilterKeys = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1.01",
  koi_smass: "1",
};

const TOO_LARGE_SOLAR_MASS: PlanetFilterKeys = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "1.04",
};

Deno.test("filter only habitable planets", () => {
  const filtered = filterHabitablePlanets([
    HABITABLE_PLANET,
    NOT_CONFIRMED,
    TOO_LARGE_PLANETARY_RADIUS,
    TOO_LARGE_SOLAR_MASS,
    TOO_LARGE_SOLAR_RADIUS,
  ]);
  assertEquals(filtered, [HABITABLE_PLANET]);
});
