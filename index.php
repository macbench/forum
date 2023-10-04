<!DOCTYPE html>
<html>

<head>
  <title>forum</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="style.css">
  <script src="main.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/emoji-picker-element@1.2.0/dist/index.css" />
  <script type="module" src="https://cdn.jsdelivr.net/npm/emoji-picker-element@1.2.0/dist/index.js"></script>

</head>

<body class="bg-dark d-flex justify-content-center">

  <!-- Modal of REPLIES -->
  <div class="modal fade" id="ReplyModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Reply Question</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form name="frm1" method="post">
            <input type="hidden" id="commentid" name="Rcommentid">
            <div class="mb-3">
              <label for="Rname" class="form-label">Write your name:</label>
              <input type="text" class="form-control" id="Rname" name="Rname" required>
            </div>
            <div class="mb-3">
              <label for="Rmsg" class="form-label">Write your reply:</label>
              <textarea class="form-control" id="Rmsg" rows="5" name="Rmsg" required></textarea>
            </div>
            <button type="button" id="btnreply" name="btnreply" class="btn btn-primary">Reply</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div class="d-flex flex-column" style="width:100%; max-width:900px; height: 100%;">

    <!-- POST BOX -->
    <!-- <div class="card d-flex flex-column d-none">
      <div class="card-body">
        <h3>Community forum</h3>
        <hr>
        <form name="frm" method="post">
          <input type="hidden" id="commentid" name="Pcommentid" value="0">
          <div class="form-group">
            <label for="usr">Write your name:</label>
            <input type="text" class="form-control" name="name" required>
          </div>
          <div class="form-group">
            <label for="comment">Write your question:</label>
            <textarea class="form-control" rows="5" name="msg" required></textarea>
          </div>
          <input type="button" id="butsave" name="save" class="btn btn-primary mt-3" value="Send">
        </form>
      </div>
    </div> -->
    <!--END  POST BOX -->


    <div class="card d-flex flex-column w-100">
      <div class="flex-grow-1 flex-shrink-0 flex-basis-auto" style=" height:100%; overflow: hidden;">
        <h4 class="z-1 card-title p-3 border-bottom border-primary border-5 position-fixed bg-white" style="width: 100vw;">Recent questions</h4>

        <div class="chat-block bg-dark px-2">
          <div id="record"></div>
        </div>
        <!-- <div class="msg-input">
          <input type="text" name="" id="" class="form-control">
        </div> -->

      </div>

      <form name="frm" method="post" class="z-1 d-flex align-items-center justify-content-center p-1 border-bottom sticky-bottom bg-info w-100">
      <input type="hidden" id="commentid" name="Pcommentid" value="0">


        <input type="text" name="msg" id="" class="mx-2 form-control rounded-pill" placeholder="Escreva algo">

        <button id="butsave" name="save" class="send_msg btn btn-primary">
          <i class="uil uil-message send_msg"></i>
        </button>


      </form>

    </div>

  </div>

  <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
  <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</body>

</html>