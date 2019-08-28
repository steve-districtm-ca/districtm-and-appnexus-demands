```
Module Name: district m Bid Adapter
Module Type: Bidder Adapter
Maintainer: Steve Alliance (steve@districtm.net)
```

# Overview

The `districtmDMXAppnexusMixAdapter` module allows publishers to include DMX Exchange demand using Prebid 1.0+.

## Attributes

* Single Request
* Multi-Size Support
* GDPR Compliant
* Bids returned in **NET**

 ## Media Types
 
* Banner

## Bidder Parameters

| Key | Scope | Type | Description
| --- | --- | --- | ---
| dmxid | Mandatory | Integer | Unique identifier of the placement, dmxid can be obtained in the district m Boost platform.
| memberid | Mandatory | Integer | Unique identifier for your account, memberid can be obtained in the district m Boost platform.

# Ad Unit Configuration Example

```javascript
    var adUnits = [{
        code: 'div-gpt-ad-1460505748561-0',
        mediaTypes: {
            banner: {
                sizes: [[300, 250], [300,600]],
            }
        },
        bids: [{
            bidder: 'districtmDMX',
            params: {
                dmxid: 100001,
                memberid:  100003
            }
        }]
    }];
```


# Quick Start Guide

###### 1. Including the `districtmDMXAppnexusMixAdapter` in your build process.

Add the adapter as an argument to gulp build.

```
gulp build --modules=districtmDMXAppnexusMixAdapter,ixBidAdapter,appnexusBidAdapter
```

*Adding `"districtmDMXAppnexusMixAdapter"` as an entry in a JSON file with your bidders is also acceptable.*

```
[
	"districtmDMXAppnexusMixAdapter",
	"ixBidAdapter",
	"appnexusBidAdapter"
]
```

*Proceed to build with the JSON file.*

```
gulp build --modules=bidderModules.json
```

###### 2. Configure the ad unit object

Once Prebid is ready you may use the below example to create the adUnits object and begin building the configuration.

```javascript
var adUnits = [{
		code: 'div-gpt-ad-1460505748561-0',
		mediaTypes: {
			banner: {
				sizes: [[300, 250], [300, 600], [728, 90]],
			}
		},
		bids: []
	}
];
```

###### 3. Add the bidder

Our demand and adapter supports multiple sizes per placement, as such a single dmxid may be used for all sizes of a single domain.

```javascript
    var adUnits = [{
        code: 'div-gpt-ad-1460505748561-0',
        mediaTypes: {
            banner: {
                sizes: [[300, 250], [300, 600], [728, 90]],
            }
        },
        bids: [{
            bidder: 'districtmDMX',
            params: {
                dmxid: 100001,
                memberid:  100003
            }
        }]
    }];
```

###### 4. For Video implementation

You can check install *lite-serve* using npm -g

```bash
npm i
```
Running the following command should give you access to the demo page.

```bash
npm run demo
```

You can also edit `bs-config.json` to change the port to run the server.

###### Module to be added to modules.json

```json
[
  "districtmDMXAppnexusMixAdapter",
  "dfpAdServerVideo"
]
```

###### Sample code you can find in the `index.html` file.

```html
  <script>
        var pbjs = pbjs || {};
        pbjs.que = pbjs.que || [];


        /* Prebid video ad unit */

        var videoAdUnit = {
            code: 'video1',
            sizes: [640,480],
            mediaTypes: { video: {context: 'instream', //or 'outstream'
                    playerSize: [[640, 480]]} },
            bids: [
                {
                    bidder: 'districtmDMX',
                    params: {
                        dmxid: '347405',
                        memberid: '100600',
                        mimes: ["application/javascript",
                            "video/mp4"],
                        video: {
                            id: 123,
                            skipppable: true,
                            playback_method: ['auto_play_sound_off']
                        }
                    }
                },
                {
                    bidder: 'appnexus',
                    params: {
                        placementId: 1999857,
                        video: {
                            id: 123,
                            skipppable: true,
                            playback_method: ['auto_play_sound_off']
                        }
                    }
                }
            ]
        };

        pbjs.que.push(function() {
            pbjs.addAdUnits(videoAdUnit);

            pbjs.setConfig({
                debug: true,
                cache: {
                    url: 'https://prebid.adnxs.com/pbc/v1/cache'
                }
            });

            pbjs.requestBids({
                bidsBackHandler: function(bids) {
                    var videoUrl = pbjs.adServers.dfp.buildVideoUrl({
                        adUnit: videoAdUnit,
                        params: {
                            iu: '/191956889/demo-video',
                            cust_params: {
                                section: 'blog',
                                anotherKey: 'anotherValue'
                            },
                            output: 'vast'
                        }
                    });
                    invokeVideoPlayer(videoUrl);
                }
            });
        });

    </script>
```

###### 5. Implementation Checking

Once the bidder is live in your Prebid configuration you may confirm it is making requests to our end point by looking for requests to `https://dmx.districtm.io/b/v1`. 
