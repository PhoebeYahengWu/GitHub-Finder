$(document).ready(function(){
    $('#searchUser').on('keyup',function(e){
        let username = e.target.value;

        // make request to GitHub
        $.ajax({
            url: 'https://api.github.com/users/' + username,
            data:{
                client_id: '3cb085ba1a68cef8af82',
                client_secret: 'd983c945203884606985fc1a3c38c20e39b5b317'
            }
        }).done(function(user){
            $.ajax({
            url: 'https://api.github.com/users/' + username + '/repos',
            data:{
                client_id: '3cb085ba1a68cef8af82',
                client_secret: 'd983c945203884606985fc1a3c38c20e39b5b317',
                sort: 'created: asc'
                // per_page: 8
            }
            }).done(function(repos){
                $.each(repos, function(index, repo){
                    $('#repos').html = " ";
                    $('#repos').append(`
                        <div class="row">
                            <div class="col s12"> 
                                <div class="card">
                                    <div class="card-content">
                                        <strong>${repo.name}</strong><br>
                                        <p>Description: ${repo.description}</p>
                                        <a href="${repo.html_url}" target="_blank">${repo.html_url}</a> 
                                    </div>  
                                </div>
                            </div>
                        </div>
                    `)
                })
            });
            $('#profile').html(`
                <div class="container-fluid">
                <div class="card mt-3">
                    <div class="card-header pb-0 mb-0">
                        <h3 class="card-title">${user.name}</h3>
                    </div>

                    <div class="card-body pb-0 mb-0">

                        <div class="row">
                            <div class="col-md-3">
                                <img style="width:100%" class="thumbnail" src="${user.avatar_url}">
                                <a target="_blank" class="btn waves-effect btn-primary btn-block mt-2" href="${user.html_url}">View Profile</a>
                            </div>
                            <div class="col-md-9">
                                <div class="row justify-content-center mt-2 mb-2">
                                <span class="badge #4db6ac teal lighten-2 white-text">Public Repos: ${user.public_repos}</span>
                                <span class="badge #4db6ac teal lighten-2 white-text">Followers: ${user.followers}</span>
                                <span class="badge #4db6ac teal lighten-2 white-text">Following: ${user.following}</span> 
                                </div>
                                <ul class="list-group">
                                    <li class="list-group-item">Compnay: ${user.company}</li>
                                    <li class="list-group-item">Website/Blog: ${user.blog}</li>
                                    <li class="list-group-item">Location: ${user.location}</li>
                                    <li class="list-group-item">Member Since: ${user.created_at.substring(0, 10)}</li>
                                    <li class="list-group-item">Last Profile Update: ${user.updated_at.substring(0, 10)}</li>
                                    <li class="list-group-item">Profile Bio: ${user.bio}</li>
                                </ul>

                            </div> 
                        </div>
                    </div>
                </div>
                </div>

                <div class="container-fluid">
                <div class="card mt-3">
                    <div class="card-header">
                        <h3 class="card-title">Latest Repos</h3> 
                    </div>

                    <div class="card-body mb-0 pb-0">

                        <div class="row mb-0 pb-0">
                            <div id="repos" class="col s12 mb-0 pb-0"></div> 
                        </div>

                    <div>
                </div>
                </div>

            `);
        });
    });
});