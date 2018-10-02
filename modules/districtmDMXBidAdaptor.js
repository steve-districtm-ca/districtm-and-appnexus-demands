import { Renderer } from 'src/Renderer';
import * as utils from 'src/utils';
import { registerBidder } from 'src/adapters/bidderFactory';
import { BANNER, NATIVE, VIDEO } from 'src/mediaTypes';
import find from 'core-js/library/fn/array/find';
import includes from 'core-js/library/fn/array/includes';
import { config } from 'src/config';


const BIDDER_CODE = 'districtmDMX';
const URL = '//ib.adnxs.com/ut/v3/prebid';
const DMXURI = 'https://dmx.districtm.io/b/v1';
const ANX_SEAT = 1908;
const VIDEO_TARGETING = ['id', 'mimes', 'minduration', 'maxduration',
    'startdelay', 'skippable', 'playback_method', 'frameworks'];
const USER_PARAMS = ['age', 'external_uid', 'segments', 'gender', 'dnt', 'language'];
const APP_DEVICE_PARAMS = ['geo', 'device_id']; // appid is collected separately
const NATIVE_MAPPING = {
    body: 'description',
    cta: 'ctatext',
    image: {
        serverName: 'main_image',
        requiredParams: { required: true },
        minimumParams: { sizes: [{}] },
    },
    icon: {
        serverName: 'icon',
        requiredParams: { required: true },
        minimumParams: { sizes: [{}] },
    },
    sponsoredBy: 'sponsored_by',
};
const SOURCE = 'pbjs';


export const spec = {
    code: BIDDER_CODE,
    supportedFormat: ["banner"],
    isBidRequestValid(bid) {
        return !!(bid.params.dmxid && bid.params.memberid);
    }

}