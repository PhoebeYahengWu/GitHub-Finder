// Client ID 3cb085ba1a68cef8af82
// Client Secret d983c945203884606985fc1a3c38c20e39b5b317

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
                sort: 'created: asc',
                per_page: 5
            }
            }).done(function(repos){
                $.each(repos, function(index, repo){
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

                    <div class="card-body">

                        <div class="row">
                            <div class="col-md-3">
                                <img style="width:100%" class="thumbnail" src="${user.avatar_url}">
                                <a target="_blank" class="btn btn-primary btn-block mt-2" href="${user.html_url}">View Profile</a>
                            </div>
                            <div class="col-md-9">
                                <span class="new badge #ffab91 deep-orange lighten-3">Followers: ${user.followers}</span>
                                <span class="new badge #80cbc4 teal lighten-3">Following: ${user.following}</span>  
                                <span class="new badge #4fc3f7 light-blue lighten-2">Public Gists: ${user.public_gists}</span>
                                <span class="new badge #9fa8da indigo lighten-3">Public Repos: ${user.public_repos}</span>
                                <br><br>

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