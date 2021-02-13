const { ZikresourceDAO } = require('./zikresource-dao');
const { Zikresource } = require('./zikresource');

const { DbHandlerFactory } = require('../db-handler-factory');

describe('zikresource-dao', () => {

    let zikresourceTest = null;
    let daoToTest = null;

    let correctData = {
        "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
        "artist": "Tool",
        "title": "Sober",
        "tags": [
            {
                "label": "type",
                "value": "tab"
            },
            {
                "label": "difficulty",
                "value": "intermediate"
            },
            {
                "label": "",
                "value": "My personal tag"
            }
        ]
    };

    let dbHandler = null;

    beforeAll(async () => {
        dbHandler = await DbHandlerFactory.build();
        daoToTest = new ZikresourceDAO();
    });
    afterEach(async () => await dbHandler.clear());
    afterAll(async () => await dbHandler.close());

    /************************************************************************************************
     * Creation tests
     ***********************************************************************************************/
 
    it("should create a zikresource if the Zikresource is valid to create it.", async () => {

        // Given a simple Zikresource, with an url, a title and less than 10 tags
        let zikresourceInput = new Zikresource(correctData.url, correctData.title);
        zikresourceInput.artist = correctData.artist;
        zikresourceInput.tags = correctData.tags;
        zikresourceInput.type = correctData.type;
        // When we want to save it on the database
        zikresourceTest = await daoToTest.save(zikresourceInput);
        // Then the zikresource created is not null
        expect(zikresourceTest != null).toBe(true);
        // And the url is the url given as input
        expect(correctData.url === zikresourceTest.url).toBe(true);
        // And the title is the title given as input
        expect(correctData.title === zikresourceTest.title).toBe(true);
        // And the tags are the tags given as input
        expect(correctData.tags.length === zikresourceTest.tags.length).toBe(true);
    });

    /************************************************************************************************
     * Removal tests
     ***********************************************************************************************/
    it('should delete a zikresource if the resource exists.', async () => {
        // Given one Zikresource in the database (because afterEach, we clear the DB)
        let zikresourceInput = new Zikresource(correctData);
        zikresourceTest = await daoToTest.save(zikresourceInput);
        let allZikresources = await daoToTest.retrieveAll();
        expect(allZikresources.length).toEqual(1);
        // When we delete it
        await daoToTest.delete(zikresourceTest);
        // Then we have no more Zikresource in the database
        allZikresources = await daoToTest.retrieveAll();
        expect(allZikresources.length).toEqual(0);
    });

    it("should have no impact if we try to delete a resource which doesn't exist.", async () => {
        // Given the empty database (because afterEach, we clear the DB)
        let allZikresources = await daoToTest.retrieveAll();
        expect(allZikresources.length).toEqual(0);
        // When we try to delete a Zikresource which doesn't exist
        let zikResource = new Zikresource();
        await daoToTest.delete(zikResource);
        // Then we have no exception and the database continues to be empty
        allZikresources = await daoToTest.retrieveAll();
        expect(allZikresources.length).toEqual(0);
    });

    /************************************************************************************************
     * Retrieve tests
     ***********************************************************************************************/
    it('should return the zikresource expected.', async () => {
        // Given one ZikResource in the database (because afterEach, we clear the DB)
        let zikresourceInput = new Zikresource(correctData);
        zikresourceTest = await daoToTest.save(zikresourceInput);
        let allZikresources = await daoToTest.retrieveAll();
        expect(allZikresources.length).toEqual(1);
        // When we try to retrieve it by its id
        let zikResourceRetrieved = await daoToTest.retrieveOneById(zikresourceTest._id);
        // Then we get the ZikResource expected
        expect(zikResourceRetrieved).not.toBeNull();
        expect(zikResourceRetrieved._id.equals(zikresourceTest._id)).toBe(true);
    });

    it("should return null if the zikresource doesn't exist.", async () => {
        // Given no ZikResource (or null)
        // When we want to retrieve it
        let zikResourceRetrieved = await daoToTest.retrieveOneById(null);
        // Then the zikResource got is null
        expect(zikResourceRetrieved).toBeNull();
    });

    /************************************************************************************************
     * Update tests
     ***********************************************************************************************/
    it("should update the ZikResource if the Zikresource exists.", async () => {
        // Given one ZikResource in the database (because afterEach, we clear the DB)
        let zikresourceInput = new Zikresource(correctData);
        zikresourceTest = await daoToTest.save(zikresourceInput);
        let allZikresources = await daoToTest.retrieveAll();
        expect(allZikresources.length).toEqual(1);
        // When we try to update it
        zikresourceTest.title = "Not so sober";
        let zikresourceUpdated = await daoToTest.updateOne(zikresourceTest._id, zikresourceTest);
        // Then the ZikResource is updated
        expect(zikresourceTest._id.equals(zikresourceUpdated._id) && zikresourceUpdated.title === "Not so sober").toBe(true);
    });

});
