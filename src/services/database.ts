import { Collection, Guild } from 'discord.js';
import { Pool, PoolClient } from 'pg';
import { DATABASE_CONFIG } from '../config/environment';
import { sendErrorLog } from '../utils/helpers';
const pool = DATABASE_CONFIG ? new Pool(DATABASE_CONFIG) : null;

type GuildRecord = {
  uuid: string;
  name: string;
  member_count: number;
  owner_id: string;
};

export async function createGuildTable() {
  if (!pool) return;
  const client: PoolClient = await pool.connect();
  if (client) {
    try {
      await client.query('BEGIN');
      const createGuildTableQuery =
        'CREATE TABLE IF NOT EXISTS Guild(uuid TEXT NOT NULL PRIMARY KEY, name TEXT NOT NULL, member_count INTEGER NOT NULL, owner_id TEXT NOT NULL)';
      await client.query(createGuildTableQuery);
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      sendErrorLog({ error });
    } finally {
      client.release();
    }
  }
}
export async function getGuilds() {
  if (!pool) return;
  const client: PoolClient = await pool.connect();
  if (client) {
    try {
      await client.query('BEGIN');
      const getAllGuildsQuery = 'SELECT * FROM Guild';
      const allGuilds = await client.query(getAllGuildsQuery);
      return allGuilds;
    } catch (error) {
      await client.query('ROLLBACK');
      sendErrorLog({ error });
    } finally {
      client.release();
    }
  }
}
export async function populateGuilds(existingGuilds: Collection<string, Guild>) {
  try {
    const guildsInDatabase = await getGuilds();
    existingGuilds.forEach(async (guild: Guild) => {
      const isInDatabase =
        guildsInDatabase &&
        guildsInDatabase.rows.find((guildDb: GuildRecord) => guildDb.uuid === guild.id);
      if (!isInDatabase) {
        await insertNewGuild(guild);
      }
    });
  } catch (error) {
    sendErrorLog({ error });
  }
}
export async function insertNewGuild(newGuild: Guild) {
  if (!pool) return;
  const client: PoolClient = await pool.connect();
  if (client) {
    try {
      await client.query('BEGIN');
      const insertNewGuildQuery =
        'INSERT INTO Guild (uuid, name, member_count, owner_id) VALUES ($1, $2, $3, $4)';
      await client.query(insertNewGuildQuery, [
        newGuild.id,
        newGuild.name,
        newGuild.memberCount,
        newGuild.ownerId,
      ]);
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      sendErrorLog({ error });
    } finally {
      client.release();
    }
  }
}
export async function deleteGuild(existingGuild: Guild) {
  if (!pool) return;
  const client: PoolClient = await pool.connect();
  if (client) {
    try {
      await client.query('BEGIN');
      const deleteGuildQuery = 'DELETE from Guild WHERE uuid = ($1)';
      await client.query(deleteGuildQuery, [existingGuild.id]);
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      sendErrorLog({ error });
    } finally {
      client.release();
    }
  }
}
