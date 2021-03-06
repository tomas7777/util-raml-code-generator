import { Entity } from 'paysera-http-client-common';

import DateFactory from '../service/DateFactory';

class DetailsOptions extends Entity {

    /**
     * @return {boolean}|null
     */
    isPreserve() {
        return this.get('preserve');
    }

    /**
     * @param {boolean} preserve
     */
    setPreserve(preserve) {
        this.set('preserve', preserve);
    }
}

export default DetailsOptions;
