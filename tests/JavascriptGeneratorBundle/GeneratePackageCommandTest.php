<?php

namespace Tests\JavascriptGeneratorBundle;

use Paysera\Bundle\JavascriptGeneratorBundle\Command\GeneratePackageCommand;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Tester\CommandTester;
use Symfony\Component\Filesystem\Filesystem;
use Tests\TestKernel;

class GeneratePackageCommandTest extends KernelTestCase
{
    static $class = TestKernel::class;

    /**
     * @var CommandTester
     */
    private $commandTester;

    /**
     * @var Filesystem
     */
    private $filesystem;

    protected function setUp()
    {
        static::$kernel = null;
        /** @var TestKernel $kernel */
        $kernel = self::createKernel();
        $kernel->boot();

        $container = $kernel->getContainer();
        $application = new Application($kernel);

        $commandInstance = new GeneratePackageCommand(
            $container->get('paysera_code_generator.code_generator'),
            $container->get('paysera_javascript_generator.service.name_resolver'),
            $container->get('filesystem'),
            __DIR__ . '/Fixtures/raml',
            __DIR__ . '/Fixtures/generated',
            $container->getParameter('vendor_prefix')
        );

        $application->add($commandInstance);

        $this->filesystem = $container->get('filesystem');
        $this->commandTester = new CommandTester($commandInstance);

        static::$kernel = $kernel;
    }

    /**
     * @dataProvider dataProviderTestGenerateCode
     *
     * @param string $apiName
     */
    public function testGenerateCode($apiName)
    {
        $this->removeTargetDir($apiName);
        $this->commandTester->execute(
            [
                'api_name' => $apiName,
                'client_name' => 'Category',
            ],
            [
                'interactive' => false
            ]
        );

        $this->ensureDirectoryTreeMatches($apiName);
    }

    public function dataProviderTestGenerateCode()
    {
        return [
            ['account'],
            ['category'],
            ['transfer'],
        ];
    }

    /**
     * @param string $apiName
     */
    private function ensureDirectoryTreeMatches($apiName)
    {
        $generatedDir = __DIR__ . '/Fixtures/generated/' . $apiName;
        if (!$this->filesystem->exists($generatedDir)) {
            $this->fail(sprintf('Expected output directory "%s" not found', $generatedDir));
        }

        $iterator = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator(
                __DIR__ . '/Fixtures/expected/' . $apiName,
                \RecursiveDirectoryIterator::SKIP_DOTS
            ),
            \RecursiveIteratorIterator::SELF_FIRST,
            \RecursiveIteratorIterator::CATCH_GET_CHILD
        );

        foreach ($iterator as $item) {
            /** @var $item \SplFileInfo */
            $expected = str_replace('/expected/', '/generated/', $item->getPathname());
            $this->assertFileExists($expected);
            if ($item->isFile()) {
                $expectedContents = file_get_contents($item->getPathname());
                $actualContents = file_get_contents($expected);

                $this->assertEquals(
                    $expectedContents,
                    $actualContents,
                    sprintf('Contents are different for file "%s"', $item->getBasename())
                );
            }
        }
    }

    private function removeTargetDir($apiName)
    {
        $generatedDir = __DIR__ . '/Fixtures/generated/' . $apiName;

        if (!$this->filesystem->exists($generatedDir)) {
            return;
        }

        $files = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($generatedDir, \RecursiveDirectoryIterator::SKIP_DOTS),
            \RecursiveIteratorIterator::CHILD_FIRST
        );

        /** @var \SplFileInfo $fileInfo */
        foreach ($files as $fileInfo) {
            if ($fileInfo->isDir()) {
                rmdir($fileInfo->getRealPath());
            } else {
                unlink($fileInfo->getRealPath());
            }
        }
        rmdir($generatedDir);
    }
}
