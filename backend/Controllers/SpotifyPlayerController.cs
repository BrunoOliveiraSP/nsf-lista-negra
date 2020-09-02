using System;
using System.Net;
using System.Net.Http;
using System.Collections;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Net.Http.Headers;
using backend.Models.External;
using backend.Models.Request;
using backend.Models.Response;
using RestSharp;

namespace backend.Business
{
    [ApiController]
    [Route("[controller]")]
    public class SpotifyPlayerController : ControllerBase
    {
        // Informações retiradas da plataforma Spotify-For-Developers
        const string REFRESH_TOKEN             = "<refresh-token>";
        const string CLIENT_AND_SECRET         = "Basic <clientid:clientsecret>";
        const string URL_SPOTIFY_REFRESHTOKEN  = "https://accounts.spotify.com/api/token";
        const string URL_SPOTIFY_PLAY          = "https://api.spotify.com/v1/me/player/play";
        static string TOKEN                    = "";



        [HttpPut]
        public async Task<ActionResult<PlayResponse>> Tocar(PlayRequest request)
        {
            try 
            {
                PlayResponse response = await ChamarSpotifyApi(request);
                return response;
            }
            catch (Exception ex)
            {
                return BadRequest(
                    new Models.Response.ErroResponse(500, ex.Message)
                );
            }
        }


        public async Task<PlayResponse> ChamarSpotifyApi(PlayRequest playRequest)
        {
            // Gera token de acesso
            string token = await GerarTokenAcesso();
            
            // Cria objeto de conexao com spotify-api
            RestClient api = new RestClient();
            api.AddDefaultHeader("Authorization", "Bearer " + token);

            // Cria body-request para enviar para spotify-api
            RestRequest request = new RestRequest(URL_SPOTIFY_PLAY, Method.PUT);
            request.AddJsonBody(new SpotifyPlayRequest(playRequest.MusicaURI));

            // Chama spotify-api verbo PUT
            IRestResponse spotifyResponse = await api.ExecuteAsync(request);
            
            // Se api expirou, reseta token
            if (spotifyResponse.StatusCode == HttpStatusCode.Unauthorized)
                TOKEN = string.Empty;

            // Cria objeto reponse
            PlayResponse response = new PlayResponse((int)spotifyResponse.StatusCode, spotifyResponse.Content);
            return response;
        }




        public async Task<string> GerarTokenAcesso()
        {
            if (string.IsNullOrEmpty(TOKEN))
            {
                // Cria objeto de conexao com spotify-api
                HttpClient client = new HttpClient();
                client.DefaultRequestHeaders.Add("Authorization", CLIENT_AND_SECRET);

                // Cria objeto form-url-request para enviar para spotify-api
                FormUrlEncodedContent body = new FormUrlEncodedContent(
                    new List<KeyValuePair<string, string>>{
                        new KeyValuePair<string, string>("grant_type", "refresh_token"),
                        new KeyValuePair<string, string>("refresh_token", REFRESH_TOKEN)
                    });

                // Chama spotify-api verbo POST
                HttpResponseMessage spotifyResp = await client.PostAsync(URL_SPOTIFY_REFRESHTOKEN, body);
                
                // Lê response da spotify-api e atualiza o token de acesso
                string jsonResponse = await spotifyResp.Content.ReadAsStringAsync();
                SpotifyRefreshTokenResponse tokenResponse = JsonConvert.DeserializeObject<SpotifyRefreshTokenResponse>(jsonResponse);
                
                TOKEN = tokenResponse.Access_Token;
            }
            return TOKEN;
        }


        
        
    }
}