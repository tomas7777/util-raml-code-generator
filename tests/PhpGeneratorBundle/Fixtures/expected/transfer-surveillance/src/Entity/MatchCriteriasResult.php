<?php

namespace Paysera\Test\TestClient\Entity;

use Paysera\Component\RestClientCommon\Entity\Result;

class MatchCriteriasResult extends Result
{
    protected function createItem(array $data)
    {
        return new MatchCriteria($data);
    }
}
