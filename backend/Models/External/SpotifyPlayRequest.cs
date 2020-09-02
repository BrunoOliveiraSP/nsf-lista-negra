using System.Collections.Generic;

namespace backend.Models.External
{
    public class SpotifyPlayRequest
    {
        public List<string> uris {get;set;}

        public SpotifyPlayRequest(string musicaURI)
        {
            uris = new List<string>();
            uris.Add(musicaURI);
        }
    }

}