<?php 	
	
	if(!isset($_GET['widget_id']) || $_GET['widget_id'] == ''){
		echo 'Widget ID is Missing!'; 
		exit;
	}

	$widgetId = $_GET['widget_id'];
	$jsonFile = "../data.json";
	$bgDir = "../backgrounds/";
	$bgArray = array();
	$dataFile = file_get_contents($jsonFile);
	$dataArray = (array) json_decode($dataFile, true);
	$reservedKeys = ['format', 'u', 'a', 'k', 's'];
	$queryString = http_build_query(array(
			'widget_id' => $widgetId,
			'layout_id' => (isset($_GET['layout_id'])) ? $_GET['layout_id'] : '',
			'screen_id' => (isset($_GET['screen_id'])) ? $_GET['screen_id'] : ''
		));

	$saveSuccess = false;

	// print_r($dataArray);

	// Process for New Set to be Generated with Defaults or Update Keys in Old Set
	$dataSet = (isset($dataArray[$widgetId])) ? $dataArray[$widgetId] : array();

	foreach ($dataArray['defaults'] as $key => $value) {
		if(!in_array($key, $reservedKeys)){
			
			$dataSet[$key] = (isset($dataSet[$key])) ? $dataSet[$key] : $value;

		}
	}

	// Read Backgrounds Dir
	if ($dh = opendir($bgDir)){
		while (($file = readdir($dh)) !== false){
			if($file != '.' && $file != '..' ){
				$bgArray[] = $file;
			}
		}
		closedir($dh);
	}

	// print_r($bgArray); exit;

	// If Form Post
	if(@$_POST){

		$dataSet['woeid'] = $_POST['woeid'];
		$dataSet['textColor'] = $_POST['text_color'];
		$dataSet['interval'] = $_POST['interval'];
		$dataSet['backgroundImage'] = $_POST['bg_image'];
		$dataSet['showDate'] = (isset($_POST['show_date']))? TRUE : FALSE;

		// Reasign to Data Array
		$dataArray[$widgetId] = $dataSet;

		// Write Back to File
		$fp = fopen($jsonFile, 'w');
		fwrite($fp, json_encode($dataArray, JSON_PRETTY_PRINT));
		fclose($fp);

		$saveSuccess = true;
	}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Weather Plugin 3.0 | Screenplify</title>

    <link rel="stylesheet" href="assets/bootstrap-4.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/styles.css">
</head>
<body class="pt-4 pb-5">
	
	<?php /* ?>
	<nav id="main-nav" class="navbar fixed-top navbar-light">
        <a class="navbar-brand ml-auto mr-auto" href="./">
            <img src="../images/logo-sm.png" alt="">
        </a>
    </nav>
	<?php */ ?>

	<div class="container">
		<div class="row">
	 		<div class="col-12 col-md-8 offset-md-2">
				
				<nav class="navbar navbar-light bg-white rounded-lg shadow mb-4">
					<a class="navbar-brand ml-auto mr-auto" href="./">
			            <img src="../images/logo-sm.png" alt="">
			        </a>
				</nav>

				<div class="card border-0 rounded-lg text-secondary shadow">
					<div class="card-body">
						<h4 class="ls-8">Settings</h4>
						<hr>
						
						<?php if($saveSuccess){ ?>
						<div class="alert alert-success">Successfully Saved</div>
						<?php } ?>

						<form method="POST" action="index.php?<?php echo $queryString; ?> ">
							<div class="form-group row py-2">
								<label class="col-sm-3 col-form-label text-left text-md-right">WOEID</label>
								<div class="col-sm-5">
									<input type="text" class="form-control" name="woeid" value="<?php echo $dataSet['woeid']; ?>">
									<small id="emailHelp" class="form-text text-muted">Refer to Yahoo Weather to get your WOEID</small>
								</div>
							</div>

							<div class="form-group row py-2">
								<label class="col-sm-3 col-form-label text-left text-md-right">Text Color</label>
								<div class="col-sm-5">
									<input type="color" class="form-control" name="text_color" value="<?php echo $dataSet['textColor']; ?>">
									<small id="emailHelp" class="form-text text-muted">In HEX Color Codes</small>
								</div>
							</div>

							<div class="form-group row py-2">
								<label class="col-sm-3 col-form-label text-left text-md-right">Update Interval</label>
								<div class="col-sm-5">
									<input type="number" class="form-control" name="interval"value="<?php echo $dataSet['interval']; ?>">
									<small id="emailHelp" class="form-text text-muted">In Miliseconds</small>
								</div>
							</div>

							<div class="form-group row py-2">
								<label class="col-sm-3 col-form-label text-left text-md-right"></label>
								<div class="col-sm-5">
									<div class="custom-control custom-switch">
										<input type="checkbox" class="custom-control-input" id="showDate" name="show_date" <?php if($dataSet['showDate']){ echo 'checked'; } ?>>
										<label class="custom-control-label" for="showDate">Show Date</label>
									</div>
								</div>
							</div>

							<div class="form-group row py-2">
								<label class="col-sm-3 col-form-label text-left text-md-right">Backgrounds</label>
								<div class="col-sm-5">
									<select class="form-control" name="bg_image">
										<option value="">None</option>
										<?php foreach ($bgArray as $key => $value) {
											$selected = ($dataSet['backgroundImage'] == 'backgrounds/'.$value) ? 'selected' : '';
											echo '<option value="backgrounds/'.$value.'" '.$selected.' >'.$value.'</option>';
										} ?>
									</select>
									<small id="emailHelp" class="form-text text-muted"><?php echo $dataSet['backgroundImage']; ?></small>
								</div>
							</div>

							<div class="form-footer border-top text-right rounded-lg pt-3">
								<button class="btn btn-success" type="submit">Save Changes</button>
							</div>
							

						</form>

					</div>
				</div>
			</div>
		</div>
	</div>
	
</body>
</html>