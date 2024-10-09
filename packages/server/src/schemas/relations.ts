import { relations } from 'drizzle-orm';
import { locations, users, countries, rooms, messages, accesses } from './'

export const usersRelations = relations(users, ({ many }) => ({
    messages: many(messages)
}));

export const roomsRelations = relations(rooms, ({ many }) => ({
    messages: many(messages)
}));

export const messagesRelations = relations(messages, ({ one }) => ({
    room: one(rooms, {
        fields: [messages.roomId],
        references: [rooms.id]
    }),
    user: one(users, {
        fields: [messages.authorId],
        references: [users.id]
    })
}))

export const accessesRelations = relations(accesses, ({ one }) => ({
    location: one(locations, {
        fields: [accesses.locationId],
        references: [locations.id]
    }),
    country: one(countries, {
        fields: [accesses.countryId],
        references: [countries.id]
    })
}))

export const locationsRelations = relations(locations, ({ one }) => ({
    country: one(countries, {
        fields: [locations.countryId],
        references: [countries.id]
    })
}));
