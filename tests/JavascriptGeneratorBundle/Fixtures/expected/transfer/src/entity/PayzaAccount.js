import { Entity } from 'paysera-http-client-common';

import DateFactory from '../service/DateFactory';

class PayzaAccount extends Entity {

    /**
     * @return {string}
     */
    getEmail() {
        return this.get('email');
    }

    /**
     * @param {string} email
     */
    setEmail(email) {
        this.set('email', email);
    }
}

export default PayzaAccount;
