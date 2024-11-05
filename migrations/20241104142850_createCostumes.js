/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("costumes", (table) => {
    table.increments("id").primary();
    table.string("name", 30).notNullable();
    table.integer("width").notNullable();
    table.integer("height").notNullable();
    table.string("image").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("costumes");
};
