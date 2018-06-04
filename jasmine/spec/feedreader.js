

 // We run all tests inside a function to ensure that they don't run until the DOM is ready. 
 
$(function() {
    // Our first suite 'RSS Feeds' is going to test some feeds.
    describe('RSS Feeds', function() {
        /* Our first test is cheking while all allFeeds array(of objects) has been 
         * defined and has at least one object.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        
        /* This test loops through each feed in the allFeeds 
         * object and ensures it has a URL defined and that
         * the URL is not empty.
         */
        it('It has a URL defined and that the URL is not empty', function() {
            for(var i = 0; i < allFeeds.length; i++){
                // Testing if url is defined
                expect(allFeeds[i].url).toBeDefined();
                // Testing if url is empty
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });
        
        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('It has a name defined and that the name is not empty', function() {
            for(var i = 0; i < allFeeds.length; i++){
                // Testing if name is defined
                expect(allFeeds[i].name).toBeDefined();
                // Testing if name is not empty
                expect(allFeeds[i].name).not.toBe('');
            }
        });
         
    });

    /* Test suite named "The menu" */
    describe('The menu', function() {
        /* This test ensures that the menu element is
         * hidden by default.
         */

        it('The menu element is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* This test ensures that the menu changes
          * visibility when the menu icon is clicked.
          */
        it('Changing visibility on Click', function() {
            // We generate a click to test that menu-hidden class is deleted and the menu is visible
            $('a.menu-icon-link').trigger('click'); 
            expect($('body').hasClass('menu-hidden')).toBe(false);
            
            // We generate again a click to test that menu-hidden class is back and the menu is hidden.
            $('a.menu-icon-link').trigger('click'); 
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        // With beforeEach we ensure that the tests don't run until loadfeed is completed. 
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        // Now that loadfeed made the job we run test to ensure that we have at least one entry.
        it('Has at least a single entry after loadFeed function is called', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        }); 
    });
 
    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* This test ensures that when a new feed is loaded
         * by the loadFeed function the content actually changes.
         */
         // variables to help us test the change.
         var firstFeed, secondFeed;

         // Before we run the test we perform a nested callback.
         beforeEach(function(done) {
            // we run loadFeed
            loadFeed(0, function() {
                // We save the first content of the .feed and we run again loadFeed
                firstFeed = document.querySelector(".feed").innerHTML;
                loadFeed(1, function() {
                    // Asynchronous function done what we needed to do so continue to tests
                    done();
                });
            });
        });

        // Now we check if the content has changed
        it('When a new feed is loaded by the loadFeed the content changes', function(done) {
            // Now we save the second content of the feed and we run the test to see if contents are different.
            secondFeed = document.querySelector(".feed").innerHTML;
            expect(firstFeed).not.toBe(secondFeed);
            // test rely upon that synchronous execution
            done();
        }); 
    });

}());
