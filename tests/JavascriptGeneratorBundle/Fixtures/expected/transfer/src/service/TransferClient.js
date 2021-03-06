import { RequestFactory } from 'paysera-http-client-common';

import TransfersBatchResult from '../entity/TransfersBatchResult';
import TransfersBatch from '../entity/TransfersBatch';
import TransferRegistrationParameters from '../entity/TransferRegistrationParameters';
import ConvertCurrency from '../entity/ConvertCurrency';
import TransferPassword from '../entity/TransferPassword';
import TransferInput from '../entity/TransferInput';
import Money from '../entity/Money';
import TransferBeneficiary from '../entity/TransferBeneficiary';
import Identifiers from '../entity/Identifiers';
import BankAccount from '../entity/BankAccount';
import Address from '../entity/Address';
import CorrespondentBank from '../entity/CorrespondentBank';
import TaxAccount from '../entity/TaxAccount';
import PayseraAccount from '../entity/PayseraAccount';
import PayzaAccount from '../entity/PayzaAccount';
import WebmoneyAccount from '../entity/WebmoneyAccount';
import Payer from '../entity/Payer';
import FinalBeneficiary from '../entity/FinalBeneficiary';
import TransferNotifications from '../entity/TransferNotifications';
import TransferNotifcation from '../entity/TransferNotifcation';
import TransferPurpose from '../entity/TransferPurpose';
import DetailsOptions from '../entity/DetailsOptions';
import TransferPassword34 from '../entity/TransferPassword34';
import TransferOutput from '../entity/TransferOutput';
import TransferInitiator from '../entity/TransferInitiator';
import TransferFailureStatus from '../entity/TransferFailureStatus';
import TransferAdditionalData from '../entity/TransferAdditionalData';
import OutCommissionRule from '../entity/OutCommissionRule';
import TransfersFilter from '../entity/TransfersFilter';
import FilteredTransfersResult from '../entity/FilteredTransfersResult';

class TransferClient {

    /**
     * @param {ClientWrapper} client
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * Sign the transfer, even if no funds available.
     * PUT /transfer/{id}/sign
     *
     * @param {string} id
     * @param {TransferRegistrationParameters} transferRegistrationParameters
     * @return {Promise.<TransferOutput>}
     */
    signTransfer(id, transferRegistrationParameters) {
        const request = RequestFactory.create(
            'PUT',
            'transfer/' + encodeURIComponent(id) + '/sign',
            transferRegistrationParameters,
        );

        return this.client
            .performRequest(request)
            .then((data) => {
                return new TransferOutput(data);
            })
        ;
    }

    /**
     * Sign and reserve money for transfer. Returns error if no funds available.
     * PUT /transfer/{id}/reserve
     *
     * @param {string} id
     * @param {TransferRegistrationParameters} transferRegistrationParameters
     * @return {Promise.<TransferOutput>}
     */
    reserveTransfer(id, transferRegistrationParameters) {
        const request = RequestFactory.create(
            'PUT',
            'transfer/' + encodeURIComponent(id) + '/reserve',
            transferRegistrationParameters,
        );

        return this.client
            .performRequest(request)
            .then((data) => {
                return new TransferOutput(data);
            })
        ;
    }

    /**
     * Provide password for Transfer. Available only for internal transfers.
     * PUT /transfer/{id}/provide-password
     *
     * @param {string} id
     * @param {TransferPassword} transferPassword
     * @return {Promise.<TransferOutput>}
     */
    provideTransferPassword(id, transferPassword) {
        const request = RequestFactory.create(
            'PUT',
            'transfer/' + encodeURIComponent(id) + '/provide-password',
            transferPassword,
        );

        return this.client
            .performRequest(request)
            .then((data) => {
                return new TransferOutput(data);
            })
        ;
    }

    /**
     * Freeze transfer. Available only for `reserved` transfers. Same as completing transfer but beneficiary cannot spend funds - they are reserved. Revoking transfer is possible after freezing.
     * PUT /transfer/{id}/freeze
     *
     * @param {string} id
     * @return {Promise.<TransferOutput>}
     */
    freezeTransfer(id) {
        const request = RequestFactory.create(
            'PUT',
            'transfer/' + encodeURIComponent(id) + '/freeze',
            null,
        );

        return this.client
            .performRequest(request)
            .then((data) => {
                return new TransferOutput(data);
            })
        ;
    }

    /**
     * Complete transfer. Available for `reserved` and `freezed` transfers.
     * PUT /transfer/{id}/complete
     *
     * @param {string} id
     * @return {Promise.<TransferOutput>}
     */
    completeTransfer(id) {
        const request = RequestFactory.create(
            'PUT',
            'transfer/' + encodeURIComponent(id) + '/complete',
            null,
        );

        return this.client
            .performRequest(request)
            .then((data) => {
                return new TransferOutput(data);
            })
        ;
    }

    /**
     * Make transfer visible in frontend for signing. If currency convert operations are related to transfer, they are done when transfer becomes `reserved`. If there are expectations in currency convert requests, transfer becomes `failed` together with related conversion request(s) if those expectations fails.
     * PUT /transfer/{id}/register
     *
     * @param {string} id
     * @param {TransferRegistrationParameters} transferRegistrationParameters
     * @return {Promise.<TransferOutput>}
     */
    registerTransfer(id, transferRegistrationParameters) {
        const request = RequestFactory.create(
            'PUT',
            'transfer/' + encodeURIComponent(id) + '/register',
            transferRegistrationParameters,
        );

        return this.client
            .performRequest(request)
            .then((data) => {
                return new TransferOutput(data);
            })
        ;
    }

    /**
     * Get transfer.
     * GET /transfer/{id}
     *
     * @param {string} id
     * @return {Promise.<TransferOutput>}
     */
    getTransfer(id) {
        const request = RequestFactory.create(
            'GET',
            'transfer/' + encodeURIComponent(id) + '',
            null,
        );

        return this.client
            .performRequest(request)
            .then((data) => {
                return new TransferOutput(data);
            })
        ;
    }
    /**
     * Revoke transfer.
     * DELETE /transfer/{id}
     *
     * @param {string} id
     * @return {Promise.<TransferOutput>}
     */
    deleteTransfer(id) {
        const request = RequestFactory.create(
            'DELETE',
            'transfer/' + encodeURIComponent(id) + '',
            null,
        );

        return this.client
            .performRequest(request)
            .then((data) => {
                return new TransferOutput(data);
            })
        ;
    }

    /**
     * Create transfer in the system. Created transfer is invisible and will be deleted if no more actions are performed.

     * POST /transfer
     *
     * @param {TransferInput} transferInput
     * @return {Promise.<TransferOutput>}
     */
    createTransfer(transferInput) {
        const request = RequestFactory.create(
            'POST',
            'transfer',
            transferInput,
        );

        return this.client
            .performRequest(request)
            .then((data) => {
                return new TransferOutput(data);
            })
        ;
    }

    /**
     * Reserve all transfers in a transaction. Possibly revoke other given transfers in same transaction. Possibly make currency convertions in in same transaction.
     * PUT /transfers/reserve
     *
     * @param {TransfersBatch} transfersBatch
     * @return {Promise.<TransfersBatchResult>}
     */
    reserveTransfers(transfersBatch) {
        const request = RequestFactory.create(
            'PUT',
            'transfers/reserve',
            transfersBatch,
        );

        return this.client
            .performRequest(request)
            .then((data) => {
                return new TransfersBatchResult(data);
            })
        ;
    }

    /**
     * Get list of transfers by filter
     * GET /transfers
     *
     * @param {TransfersFilter} transfersFilter
     * @return {Promise.<FilteredTransfersResult>}
     */
    getTransfers(transfersFilter) {
        const request = RequestFactory.create(
            'GET',
            'transfers',
            transfersFilter,
        );

        return this.client
            .performRequest(request)
            .then((data) => {
                return new FilteredTransfersResult(data, 'transfers');
            })
        ;
    }

}

export default TransferClient;
