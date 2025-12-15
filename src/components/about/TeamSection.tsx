// components/about/TeamSection.tsx
import React from 'react';
import { Users, Mail, Phone, Shield } from 'lucide-react';
import { type TeamMember } from './types/about';

interface TeamSectionProps {
  team: TeamMember[];
  isDarkMode: boolean;
}

const TeamSection: React.FC<TeamSectionProps> = ({ team, isDarkMode }) => {
  if (team.length === 0) {
    return (
      <div className="text-center py-12">
        <Users size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-xl text-gray-500">No team members found</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {team.map((member) => (
          <div 
            key={member.id} 
            className={`rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] ${
              isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
            }`}
          >
            {member.photo_url ? (
              <img 
                src={member.photo_url} 
                alt={member.full_name}
                className="w-full h-64 object-cover"
              />
            ) : (
              <div className="w-full h-64 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Users size={64} className="text-white opacity-80" />
              </div>
            )}
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">{member.full_name}</h3>
              <p className="text-blue-600 dark:text-blue-400 mb-3">{member.display_position}</p>
              
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                <Shield size={16} className="mr-2" />
                <span>{member.years_experience}+ years experience</span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {member.bio}
              </p>
              
              <div className="flex items-center space-x-4 pt-4 border-t dark:border-gray-700">
                {member.email && (
                  <a 
                    href={`mailto:${member.email}`}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <Mail size={18} />
                  </a>
                )}
                {member.phone && (
                  <a 
                    href={`tel:${member.phone}`}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <Phone size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;