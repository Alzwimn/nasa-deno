import { join } from "https://deno.land/std@0.105.0/path/mod.ts";
import * as log from 'https://deno.land/std@0.105.0/log/mod.ts';
import { BufReader } from "https://deno.land/std@0.105.0/io/bufio.ts";
import { parse } from "https://deno.land/std@0.105.0/encoding/csv.ts";
import * as _ from "https://raw.githubusercontent.com/lodash/lodash/4.17.15-es/lodash.js";

type Planet = Record<string, string>;

let planets: Planet[];

export function filterHabitablePlanets(planets: Planet[]) {
  return planets.filter((planet) => {
    const planetaryRadius = Number(planet["koi_prad"]);
    const stellarMass = Number(planet["koi_smass"]);
    const stellarRadius = Number(planet["koi_srad"]);
    return planet["koi_disposition"] === "CONFIRMED" &&
      planetaryRadius > 0.5 && planetaryRadius < 1.5 &&
      stellarMass > 0.78 && stellarMass < 1.04 &&
      stellarRadius > 0.99 && stellarRadius < 1.01;
  });
}

async function loadPlanetsData() {
  const path = join("data", "kepler_exoplanets_nasa.csv");

  const file = await Deno.open(path);
  const bufReader = new BufReader(file);
  const result = await parse(bufReader, {
    comment: "#",
    skipFirstRow: true,
  }) as Planet[];
  Deno.close(file.rid);

  const habiTablePlanets = filterHabitablePlanets(result as Planet[]);
  return habiTablePlanets.map((planet) => {
    return _.pick(planet, [
      "koi_prad",
      "koi_smass",
      "koi_srad",
      "kepler_name",
      "koi_count",
      "koi_steff",
    ]);
  });
}

planets = await loadPlanetsData();
log.info(`${planets.length} habitable planets found!`);

export function getAllPlanets() {
  return planets;
}
