import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";

actor {
  include MixinStorage();

  type Video = {
    id : Text;
    blob : Storage.ExternalBlob;
    name : Text;
  };

  let videos = Map.empty<Text, Video>();

  public shared ({ caller }) func addVideo(id : Text, blob : Storage.ExternalBlob, name : Text) : async () {
    if (videos.containsKey(id)) {
      Runtime.trap("This video already exists.");
    };
    let video = {
      id;
      blob;
      name;
    };
    videos.add(id, video);
  };

  public query ({ caller }) func getVideo(id : Text) : async Video {
    switch (videos.get(id)) {
      case (null) { Runtime.trap("Video does not exist") };
      case (?video) { video };
    };
  };

  public query ({ caller }) func getAllVideos() : async [Video] {
    videos.values().toArray();
  };
};
