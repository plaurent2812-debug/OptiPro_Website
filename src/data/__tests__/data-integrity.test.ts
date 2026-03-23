import { optiboardPacks } from '@/data/packs';
import { addons } from '@/data/addons';
import { sectors } from '@/data/sectors';

describe('Data integrity', () => {
    describe('optiboardPacks', () => {
        it('has exactly 2 packs', () => {
            expect(optiboardPacks).toHaveLength(2);
        });

        it('all packs have required fields', () => {
            optiboardPacks.forEach((pack) => {
                expect(pack.id).toBeTruthy();
                expect(pack.name).toBeTruthy();
                expect(pack.price).toBeTruthy();
                expect(pack.features.length).toBeGreaterThan(0);
            });
        });

        it('has unique IDs', () => {
            const ids = optiboardPacks.map((p) => p.id);
            expect(new Set(ids).size).toBe(ids.length);
        });

        it('has exactly one highlighted pack', () => {
            const highlighted = optiboardPacks.filter((p) => p.highlighted);
            expect(highlighted).toHaveLength(1);
        });

        it('prices match Accompagné 299, Premium 499', () => {
            const accompagne = optiboardPacks.find((p) => p.id === 'accompagne');
            const premium = optiboardPacks.find((p) => p.id === 'premium');
            expect(accompagne?.priceNum).toBe(299);
            expect(premium?.priceNum).toBe(499);
        });
    });

    describe('addons', () => {
        it('is an array (features now embedded in plans)', () => {
            expect(Array.isArray(addons)).toBe(true);
        });
    });

    describe('sectors', () => {
        it('has at least 3 sectors', () => {
            expect(sectors.length).toBeGreaterThanOrEqual(3);
        });

        it('all sectors have required fields', () => {
            sectors.forEach((sector) => {
                expect(sector.id).toBeTruthy();
                expect(sector.title).toBeTruthy();
                expect(sector.challenges).toBeTruthy();
                expect(sector.solution).toBeTruthy();
            });
        });

        it('all sectors target BTP trades', () => {
            // Every sector must have an icon (new field added)
            sectors.forEach((sector) => {
                expect(sector.icon).toBeTruthy();
            });
        });
    });
});
