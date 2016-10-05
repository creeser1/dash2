<?php
//Routes PROD

/*some automated server monitoring expects this*/
$app->get('/index.html', function ($request, $response, $args) {
    return $this->view->render($response, 'root.html', [
        'name' => 'test'
    ]);
});

$app->get('/', function ($request, $response, $args) {
    return $this->view->render($response, 'root.html', [
        'name' => 'root'
    ]);
});

$app->get('/favicon.ico', function ($request, $response, $args) {
    return $this->view->render($response, 'csyoufavicon.ico', [
        'name' => 'favicon'
    ]);
});

$app->get('/data/{dataset:.*}', function ($request, $response, $args) {
	$this->logger->addInfo('dataset');
	$this->logger->addInfo($args['dataset']);
	/*if .json else (if .zip content type different return binary stream -- href download property)*/
	$newResponse = $response->withHeader('Content-type', 'application/json');
    return $this->data->render($newResponse, $args['dataset'], [
        'name' => $args['dataset']
    ]);
})->setName('dataset');

// normal read only access
$app->get('/dashboard/{id}', function ($request, $response, $args) {
	$whitelist = ['csu-comparisons' => '1', 'csu-peer-benchmarking' => '2', 'what-paths-do-they-follow' => '144'];
	if (array_key_exists($args['id'], $whitelist)) {
		$id = $whitelist[$args['id']];
		$builder = new PageConfigurator('bublin', $this->db);
		$page = $builder->loadPublishedPage($id);
		$template = $page['pagetemplate'].'.html';
		$this->logger->addInfo('published page');
		$this->logger->addInfo($template);
		$page['iseditable'] = false;
		return $this->view->render($response, $template, [
			'page' => $page // no token, not editable
		]);
	} else {
		$this->logger->addInfo('Requested missing page: /dashboard/'.$args['id']);
		return $response->withHeader('Content-Type', 'text/html')
			->withStatus(404)
			->write('Page not found');
	}
})->setName('dashboard');
